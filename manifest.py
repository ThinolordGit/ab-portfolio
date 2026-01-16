from PIL import Image, ImageDraw

# Chemin de ton image source
input_path = "public/img/pp.jpg"

# Ouvre l'image
img = Image.open(input_path)

# Fonction pour crop le bas si nécessaire (garder le haut)
def crop_top(img, target_ratio):
    img_ratio = img.width / img.height
    if img_ratio > target_ratio:
        # Trop large → crop les côtés, centré horizontalement
        new_width = int(img.height * target_ratio)
        left = (img.width - new_width) // 2
        right = left + new_width
        top = 0
        bottom = img.height
    else:
        # Trop haut → crop le bas uniquement
        new_height = int(img.width / target_ratio)
        left = 0
        right = img.width
        top = 0
        bottom = new_height
    return img.crop((left, top, right, bottom))

# Fonction pour créer une icône ronde
def make_rounded(img, size):
    # Resize
    img_resized = img.resize((size, size), Image.LANCZOS)
    # Masque rond
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size, size), fill=255)
    # Applique le masque
    rounded = Image.new("RGBA", (size, size))
    rounded.paste(img_resized, (0, 0), mask)
    return rounded

# Liste des icônes carré (nom, taille)
square_icons = [
    ("public/logo192.png", 192),
    ("public/logo512.png", 512),
    ("public/apple-touch-icon.png", 180),
]

for filename, size in square_icons:
    cropped = crop_top(img, 1.0)  # carré
    resized = cropped.resize((size, size), Image.LANCZOS)
    resized.save(filename, optimize=True)
    print(f"✅ Généré : {filename} ({size}x{size}px)")

# Favicon rond
favicon = make_rounded(crop_top(img, 1.0), 48)
favicon.save("public/favicon.ico", format="ICO", optimize=True)
print("✅ Généré : public/favicon.ico (48x48, rounded)")

# OG Image
# og_cropped = crop_top(img, 1200/630)
# og_resized = og_cropped.resize((1200, 630), Image.LANCZOS)
# og_resized.save("public/og-image.png", optimize=True)
# print("✅ Généré : public/og-image.png (1200x630)")

print("🎉 Toutes les images pour manifest et OG sont prêtes !")
