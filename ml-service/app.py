# from flask import Flask
# from flask_cors import CORS

# app = Flask(__name__)

# CORS(
#     app,
#     resources={
#         r"/*": {
#             "origins": "*"
#         }
#     }
# )

# # import routes
# from routes.generate import *
# from routes.refine import *
# from routes.image import *
# from routes.clipscore import *
# from routes.health import *

# if __name__ == "__main__":
#     app.run(
#         host="0.0.0.0",
#         port=5000,
#         debug=False
#     )

from flask import Flask
from flask_cors import CORS

from routes.generate import generate_bp
from routes.refine import refine_bp
from routes.image import image_bp
from routes.clipscore import clip_bp
from routes.health import health_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(generate_bp)
app.register_blueprint(refine_bp)
app.register_blueprint(image_bp)
app.register_blueprint(clip_bp)
app.register_blueprint(health_bp)

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000
    )