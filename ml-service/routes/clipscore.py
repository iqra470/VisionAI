from flask import Blueprint
from flask import request
from flask import jsonify

from PIL import Image

import torch

from models.clip import clip_model
from models.clip import clip_preprocess

from config import DEVICE

clip_bp = Blueprint(
    "clipscore",
    __name__
)


@clip_bp.route(
    "/clip-score",
    methods=["POST"]
)
def clip_score():

    try:

        original = request.files["original"]

        generated = request.files["generated"]

        original_image = Image.open(
            original.stream
        ).convert("RGB")

        generated_image = Image.open(
            generated.stream
        ).convert("RGB")

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

        return jsonify({

            "success":True,

            "clipScore":score

        })

    except Exception as e:

        return jsonify({

            "success":False,

            "error":str(e)

        })