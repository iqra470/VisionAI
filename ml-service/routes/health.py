from flask import Blueprint
from flask import jsonify

from config import DEVICE

health_bp = Blueprint(
    "health",
    __name__
)


@health_bp.route("/")

def home():

    return jsonify({

        "success":True,

        "message":"AI Server Running"

    })


@health_bp.route("/health")

def health():

    return jsonify({

        "status":"running",

        "device":DEVICE,

        "caption_model":"Loaded",

        "stable_diffusion":"Loaded",

        "clip":"Loaded"

    })