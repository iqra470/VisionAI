from transformers import (
    BlipProcessor,
    BlipForConditionalGeneration
)

from config import DEVICE

print("Loading BLIP...")

processor = BlipProcessor.from_pretrained(
    "Salesforce/blip-image-captioning-large"
)

caption_model = BlipForConditionalGeneration.from_pretrained(
    "Salesforce/blip-image-captioning-large"
)

caption_model = caption_model.to(DEVICE)

print("BLIP Loaded")