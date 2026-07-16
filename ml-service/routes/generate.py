from flask import Blueprint
from flask import request
from flask import jsonify

from PIL import Image

import io

from models.blip import processor
from models.blip import caption_model

from config import DEVICE

generate_bp = Blueprint(
    "generate",
    __name__
)

@generate_bp.route(
    "/generate",
    methods=["POST"]
)
def generate():

    try:

        if "image" not in request.files:

            return jsonify({

                "success":False,

                "message":"Image Missing"

            })

        file=request.files["image"]

        image=Image.open(
            file.stream
        ).convert("RGB")

        image=image.resize(
            (512,512)
        )

        inputs=processor(
            image,
            return_tensors="pt"
        ).to(DEVICE)

        output=caption_model.generate(

            **inputs,

            max_new_tokens=80,

            num_beams=5

        )

        caption=processor.decode(

            output[0],

            skip_special_tokens=True

        )

        prompt=f"""

Ultra realistic,

professional photography,

cinematic lighting,

8k,

highly detailed,

DSLR,

award winning,

sharp focus,

{caption}

"""

        return jsonify({

            "success":True,

            "caption":caption,

            "prompt":prompt

        })

    except Exception as e:

        return jsonify({

            "success":False,

            "error":str(e)

        })