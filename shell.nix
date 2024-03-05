# shell.nix
{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    bun
    nodejs_20
  ];
}
