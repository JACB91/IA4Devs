.PHONY: all

all: diagrams.svg ats_architecture_on_aws.png

diagrams.svg: diagrams.puml
	plantuml -tsvg diagrams.puml

ats_architecture_on_aws.png: ats_architecture.py
	python ats_architecture.py