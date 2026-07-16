from flask import Blueprint
from flask import request
from flask import jsonify

from PIL import Image

import base64
import io
import torch

from models.diffusion import pipe
from models.clip import clip_model
from models.clip import clip_preprocess

from config import DEVICE

image_bp = Blueprint(
    "image",
    __name__
)


@image_bp.route(
    "/generate-image",
    methods=["POST"]
)
def generate_image():

    try:

        data = request.get_json()

        prompt = data["prompt"]

        original_base64 = data["originalImage"]

        mode = data.get(
            "mode",
            "original"
        )

        original_bytes = base64.b64decode(
            original_base64
        )

        original_image = Image.open(

            io.BytesIO(original_bytes)

        ).convert("RGB")

        original_image = original_image.resize(
            (512,512)
        )

        generated_image = pipe(

            prompt=prompt,

            image=original_image,

            strength=0.70,

            guidance_scale=8,

            num_inference_steps=35

        ).images[0]


        img1 = clip_preprocess(
            original_image
        ).unsqueeze(0).to(DEVICE)

        img2 = clip_preprocess(
            generated_image
        ).unsqueeze(0).to(DEVICE)

        with torch.no_grad():

            feat1 = clip_model.encode_image(
                img1
            )

            feat2 = clip_model.encode_image(
                img2
            )

            similarity = torch.cosine_similarity(

                feat1,

                feat2

            )

        score = round(

            similarity.item()*100,

            2

        )

        buffer = io.BytesIO()

        generated_image.save(

            buffer,

            format="PNG"

        )

        encoded = base64.b64encode(

            buffer.getvalue()

        ).decode("utf-8")

        return jsonify({

            "success":True,

            "generatedImage":encoded,

            "clipScore":score,

            "mode":mode,

            "prompt":prompt

        })

    except Exception as e:

        return jsonify({

            "success":False,

            "error":str(e)

        })