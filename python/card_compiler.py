"""
python/card_compiler.py

Very simple script that takes a minimal card spec
and writes it into the cards/ directory as JSON.

Usage (example):

    python card_compiler.py appendix_experiment \
        --applies-to AppendixSection \
        --law-id exp_law_1 \
        --description "Experimental law from Python"

This is just a starting point; extend as you like.
"""

import argparse
import json
from pathlib import Path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("card_name", help="Base name for the card file (no extension).")
    parser.add_argument("--applies-to", dest="applies_to", default="AppendixSection")
    parser.add_argument("--law-id", dest="law_id", default="python_generated_law")
    parser.add_argument(
        "--description",
        dest="description",
        default="Python-generated placeholder law.",
    )

    args = parser.parse_args()

    card = {
        "id": f"{args.card_name}_card",
        "name": f"Python Generated Card: {args.card_name}",
        "version": "0.0.1",
        "applies_to": [args.applies_to],
        "laws": [
            {
                "id": args.law_id,
                "type": "noop",
                "severity": "info",
                "description": args.description,
            }
        ],
    }

    out_dir = Path(__file__).resolve().parent.parent / "cards"
    out_dir.mkdir(parents=True, exist_ok=True)

    out_path = out_dir / f"{args.card_name}.json"
    out_path.write_text(json.dumps(card, indent=2))

    print(f"Wrote card to {out_path}")


if __name__ == "__main__":
    main()
