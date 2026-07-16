import open_clip

from config import DEVICE

print("Loading CLIP...")

clip_model, _, clip_preprocess = open_clip.create_model_and_transforms(

    "ViT-B-32",

    pretrained="openai"

)

clip_model.to(DEVICE)

clip_model.eval()

print("CLIP Loaded")