ROUTES := $(shell find src/routes -type f -name '*.tsx')
META := $(ROUTES:.tsx=.json)

src/images.json.d.ts: public/images
	@./bin/images > $@

%.json : %.tsx
	@echo "Generating $@"
	@./bin/meta $< > $@

all: $(META)

dev: $(META) src/images.json.d.ts

clean:
	@rm -f src/images.json.d.ts
	@find src/routes -type f -name '*.json' -delete

watch:
	@while true; do\
		make -s --no-print-directory dev;\
		inotifywait -qqre close_write .;\
	done
