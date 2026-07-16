from flask import Blueprint
from flask import request
from flask import jsonify

refine_bp=Blueprint(

    "refine",

    __name__

)

@refine_bp.route(

    "/refine-prompt",

    methods=["POST"]

)

def refine_prompt():

    try:

        data=request.get_json()

        prompt=data.get(

            "prompt",

            ""

        )

        enhancements=data.get(

            "enhancements",

            []

        )

        extra=", ".join(

            enhancements

        )

        refined=f"""

{prompt}

Enhance using:

{extra}

Ultra realistic,

professional photography,

cinematic lighting,

HDR,

8K,

award winning,

masterpiece,

realistic textures,

best quality,

sharp focus

"""

        return jsonify({

            "success":True,

            "refinedPrompt":refined

        })

    except Exception as e:

        return jsonify({

            "success":False,

            "error":str(e)

        })