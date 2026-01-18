import subprocess
import sys
from pathlib import Path

def run_notebook():
    notebook_path = Path("notebooks/otimization_track.ipynb")

    if not notebook_path.exists():
        raise FileNotFoundError(f"Notebook não encontrado: {notebook_path}")

    cmd = [
        sys.executable,
        "-m",
        "jupyter",
        "nbconvert",
        "--to",
        "notebook",
        "--execute",
        "--inplace",
        str(notebook_path),
    ]

    print("Executando notebook:", notebook_path)
    subprocess.run(cmd, check=True)
    print("Notebook executado com sucesso.")

if __name__ == "__main__":
    run_notebook()
