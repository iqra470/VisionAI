# =========================================================
# AI MODELS SERVER (app.py)
# BLIP + Stable Diffusion
# =========================================================

from flask import Flask, request, jsonify
from flask_cors import CORS

from transformers import (
    VisionEncoderDecoderModel,
    ViTImageProcessor,
    AutoTokenizer
)

from diffusers import StableDiffusionPipeline

from PIL import Image

import torch
import base64
import io
import os


# =========================================================
# FLASK APP
# =========================================================

app = Flask(__name__)
CORS(app)

# create generated folder
os.makedirs("generated", exist_ok=True)


# =========================================================
# DEVICE
# =========================================================

device = "cuda" if torch.cuda.is_available() else "cpu"

print(f"USING DEVICE: {device}")


# =========================================================
# LOAD BLIP MODEL
# =========================================================

print("Loading Caption Model...")

caption_model = VisionEncoderDecoderModel.from_pretrained(
    "nlpconnect/vit-gpt2-image-captioning"
)

feature_extractor = ViTImageProcessor.from_pretrained(
    "nlpconnect/vit-gpt2-image-captioning"
)

tokenizer = AutoTokenizer.from_pretrained(
    "nlpconnect/vit-gpt2-image-captioning"
)

caption_model.to(device)

print("Caption Model Loaded")


# =========================================================
# LOAD STABLE DIFFUSION
# =========================================================

print("Loading Stable Diffusion...")

pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
)

pipe = pipe.to(device)

print("Stable Diffusion Loaded")


# =========================================================
# HOME ROUTE
# =========================================================

@app.route("/")
def home():

    return jsonify({
        "message": "AI Server Running"
    })


# =========================================================
# GENERATE PROMPT
# =========================================================

@app.route("/generate", methods=["POST"])
def generate_prompt():

    try:

        # image check
        if "image" not in request.files:

            return jsonify({
                "error": "No image uploaded"
            }), 400

        file = request.files["image"]

        # open image
        image = Image.open(file.stream).convert("RGB")

        # preprocess
        pixel_values = feature_extractor(
            images=image,
            return_tensors="pt"
        ).pixel_values

        pixel_values = pixel_values.to(device)

        # generate caption
        output_ids = caption_model.generate(
            pixel_values,
            max_length=30
        )

        caption = tokenizer.decode(
            output_ids[0],
            skip_special_tokens=True
        )

        # optimized prompt
        prompt = f"""
        Ultra realistic,
        cinematic lighting,
        masterpiece,
        8k,
        highly detailed,
        professional photography,
        {caption}
        """

        return jsonify({

            "caption": caption,
            "prompt": prompt

        })

    except Exception as e:

        print(e)

        return jsonify({
            "error": str(e)
        }), 500


# =========================================================
# GENERATE IMAGE
# =========================================================

@app.route("/generate-image", methods=["POST"])
def generate_image():

    try:

        data = request.json

        prompt = data.get("prompt")

        if not prompt:

            return jsonify({
                "error": "Prompt required"
            }), 400

        # generate image
        image = pipe(prompt).images[0]

        # save image
        image_path = "generated/generated.png"

        image.save(image_path)

        # convert to base64
        buffered = io.BytesIO()

        image.save(buffered, format="PNG")

        img_str = base64.b64encode(
            buffered.getvalue()
        ).decode()

        return jsonify({

            "image": img_str

        })

    except Exception as e:

        print(e)

        return jsonify({
            "error": str(e)
        }), 500


# =========================================================
# START SERVER
# =========================================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=8000
    )