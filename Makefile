ROUTES := $(shell find src/routes -type f -name '*.tsx')
META := $(ROUTES:.tsx=.json)

src/images.json.d.ts:
	@./bin/images > $@

%.json : %.tsx
	@echo "Generating $@"
	@./bin/meta $< > $@

all: src/images.json.d.ts $(META)

clean:
	@find src/routes -type f -name '*.json' -delete

watch:
	@while true; do\
		make -s --no-print-directory all;\
		inotifywait -qqre close_write .;\
	done
