import os
import shutil
from PIL import Image

def create_mario_project():
    # Primero, eliminar el directorio mario-clone si existe
    if os.path.exists('mario-clone'):
        shutil.rmtree('mario-clone')

    # Definir la estructura del proyecto
    base_dir = 'mario-clone'
    assets_dir = os.path.join(base_dir, 'assets', 'images')
    
    # Crear directorios
    os.makedirs(assets_dir, exist_ok=True)
    os.makedirs(os.path.join(base_dir, 'assets', 'audio'), exist_ok=True)

    # Copiar la imagen de Mario existente
    try:
        mario_img = Image.open('images/mario.png')
        # Redimensionar si es necesario
        mario_img = mario_img.resize((32, 32), Image.Resampling.LANCZOS)
        
        # Guardar la imagen de Mario directamente en la carpeta images
        mario_img.save(os.path.join(assets_dir, 'mario.png'))
        
        # Crear sprite del enemigo (un fantasma simple)
        enemy_img = Image.new('RGBA', (32, 32), (255, 0, 0, 128))
        enemy_img.save(os.path.join(assets_dir, 'enemy.png'))
        
        # Crear sprite de estrella
        star_img = Image.new('RGBA', (32, 32), (255, 255, 0, 255))
        star_img.save(os.path.join(assets_dir, 'star.png'))
        
    except FileNotFoundError:
        print("Error: No se encontró la imagen mario.png en la carpeta images")
        return
    except Exception as e:
        print(f"Error al procesar la imagen: {e}")
        return

    # Crear index.html
    with open(os.path.join(base_dir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write('''<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Super Mario Clone</title>
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #333;
        }
    </style>
</head>
<body>
    <script src="main.js"></script>
</body>
</html>''')

    print("¡Estructura del proyecto creada exitosamente!")
    print(f"Sprites creados en: {assets_dir}")
    print("Recuerda ejecutar el servidor web desde el directorio raíz del proyecto")

if __name__ == "__main__":
    create_mario_project() 