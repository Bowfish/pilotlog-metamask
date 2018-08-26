# Pilot Log - Avoiding Common Attacks

## Author
Damian Hischier

## Table of Contents
- [Reentrancy](#reentrancy)
- [Cross-function Race Conditions](#cross-function-race-conditions)
- [Timestamp Dependencies](#timestamp-dependencies)
- [DoS with Block Gas Limit](#dos-with-block-gas-limit)

## Reentrancy
In order to prevent this attack external functions are only called after all internal work is done.

## Cross-function Race Conditions
None of the functions share the same state.

## Timestamp Dependencies
There are no timestamp dependent functions in the contracts.

## Integer Overflow and Underflow
All integers which are passed as arguments are checked that they are withn the maximum range.

## DoS with Block Gas Limit
There are no operations which could exceed the block gas limit or loops over arrays of unkonwn size.
