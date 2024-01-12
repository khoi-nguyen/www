ROUTES := $(shell find src/routes -type f -name '*.tsx')
META := $(ROUTES:.tsx=.json)

%.json : %.tsx
	@echo "Generating $@"
	@./bin/meta $< > $@

all: $(META)

clean:
	@find src/routes -type f -name '*.json' -delete

watch:
	@while true; do\
		make -s --no-print-directory all;\
		inotifywait -qqre close_write .;\
	done
