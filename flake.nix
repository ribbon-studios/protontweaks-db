{
  description = "Orchestrator";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { nixpkgs, ... }: let
    forAllSystems = nixpkgs.lib.genAttrs nixpkgs.lib.systems.flakeExposed;
  in {
    # Devshell for bootstrapping; acessible via 'nix develop' or 'nix-shell' (legacy)
    devShells = forAllSystems (systems:
      let pkgs = nixpkgs.legacyPackages.${systems};
      in import ./shell.nix { inherit pkgs; }
    );
  };
}
