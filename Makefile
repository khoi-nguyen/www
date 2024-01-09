ROUTES := $(shell find src/routes -type f -name '*.tsx')
META := $(ROUTES:.tsx=.json)

%.json : %.tsx
	@echo "Generating $@"
	@./bin/meta $< > $@

all: $(META)

clean:
	@rm $(META)

watch:
	@while true; do\
		make all;\
		inotifywait -qre close_write .;\
	done
