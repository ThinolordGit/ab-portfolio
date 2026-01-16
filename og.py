from PIL import Image

# Chemin de ton image source
input_path = "public/img/pp.jpg"

# Chemin de sortie
output_path = "public/og-image.png"

# Dimensions OG standard
og_width = 1200
og_height = 630

# Ouvre l'image
img = Image.open(input_path)

# Ratio OG
og_ratio = og_width / og_height
img_ratio = img.width / img.height

# Crop en gardant le haut
if img_ratio > og_ratio:
    # Trop large → crop les côtés, centré horizontalement
    new_width = int(img.height * og_ratio)
    left = (img.width - new_width) // 2
    right = left + new_width
    top = 0
    bottom = img.height
else:
    # Trop haut → crop le bas uniquement
    new_height = int(img.width / og_ratio)
    left = 0
    right = img.width
    top = 0
    bottom = new_height

# Crop l'image
img_cropped = img.crop((left, top, right, bottom))

# Resize pour OG
img_resized = img_cropped.resize((og_width, og_height), Image.LANCZOS)

# Sauvegarde
img_resized.save(output_path, optimize=True)

print(f"✅ Image OG créée : {output_path} ({og_width}x{og_height}px)")
