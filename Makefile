develop:
ifeq ($(shell printenv IN_NIX_SHELL),)
	@nix develop --impure --command $(shell printenv SHELL)
else
	$(info You are already running in a nix shell!)
endif
