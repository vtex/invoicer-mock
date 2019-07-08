THIS_FILE := $(lastword $(MAKEFILE_LIST))
TAG := $(shell echo $$(cat manifest.json | grep version | head -1 | awk -F: '{ print $$2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]'))

.PHONY: node graphql

help:
	@echo "Available Targets:"
	@cat Makefile | egrep '^([-a-zA-Z]+?):' | sed 's/:\(.*\)//g' | sed 's/^/- /g'

promote:
	vtex workspace reset -p
	vtex install
	vtex promote

release:
	vtex release patch stable

minor:
	vtex release minor stable

major:
	vtex release major stable

beta:
ifneq (,$(findstring beta,$(TAG)))
	vtex release prerelease
else
	vtex release
endif

deploy: release promote
