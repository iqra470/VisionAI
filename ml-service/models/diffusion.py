import torch

from diffusers import StableDiffusionImg2ImgPipeline

from config import DEVICE

print("Loading Stable Diffusion...")

pipe = StableDiffusionImg2ImgPipeline.from_pretrained(

    "SG161222/Realistic_Vision_V5.1_noVAE",

    torch_dtype=(
        torch.float16
        if DEVICE == "cuda"
        else torch.float32
    )

)

pipe = pipe.to(DEVICE)

print("Stable Diffusion Loaded")