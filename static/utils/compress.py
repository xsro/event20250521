import os
import subprocess

def compress_image(input_path, output_path):
    try:
        # 尝试不同的质量参数进行压缩
        quality = 80
        while True:
            command = [
                'magick',
                'convert',
                input_path,
                '-quality', str(quality),
                output_path
            ]
            subprocess.run(command, check=True)
            # 检查压缩后的文件大小
            if os.path.getsize(output_path) <= 250 * 1024:
                break
            quality -= 5
            if quality < 10:
                print(f"无法将 {input_path} 压缩到 250kb 以内。")
                break
    except subprocess.CalledProcessError as e:
        print(f"处理 {input_path} 时出错: {e}")
    except Exception as e:
        print(f"发生未知错误: {e}")


def process_images(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            file_path = os.path.join(root, file)
            file_size = os.path.getsize(file_path)
            if file_size > 300 * 1024:
                file_name, file_ext = os.path.splitext(file)
                output_file_name = f"{file_name}_250kb{file_ext}"
                output_path = os.path.join(root, output_file_name)
                compress_image(file_path, output_path)



if __name__ == "__main__":
    from pathlib import Path
    folder_path = Path.cwd() / 'content' / 'member' /'images'
    process_images(folder_path)
