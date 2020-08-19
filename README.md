# Skipchain explorer

<div align="center">
    <img src="public/logo-full.png">
</div>

[![DEDIS deployment](https://github.com/dedis/skipchain-explorer/workflows/DEDIS%20deployment/badge.svg)](https://github.com/dedis/skipchain-explorer/actions?query=workflow%3A%22DEDIS+deployment%22)
[![build](https://img.shields.io/travis/dedis/student_18_explorer.svg)](https://travis-ci.org/dedis/student_18_explorer)

This is the maintained version of the [student project](https://github.com/dedis/student_18_explorer).

## A Skipchain Explorer

### Explorer

In this project, we build an Explorer for SkipChains. The platform allows users
to see the main blocks from the chain as well as navigate through them by having
access to their Block Information page.

### Graph

The platform also gives a visual identity to SkipChains by representing them and
their parameters. Users can then interact with this graph: fetch blocks that
have not been loaded yet, access to their Block Information page by double
clicking them, understand how blocks are connected to each other via their
Backward and Forward links. The goal of this part is also to show the importance
of a SkipChain's initial parameters (base and height) and how it will influence
the chain' structure and block retrieval.

### ByzCoin blocks
SkipBlocks from ByzCoin SkipChains have a particular display as they can hold
multiple transactions. The Block Information page of a ByzCoin block will mainly
display the type of each transaction (Spawn, Invoke, Delete (to be
implemented)), a pin showing whether or not the transaction has been accepted,
the signer and its signature, and finally the content of each transaction.


A default Roster is used to give access to a first set of SkipChains, but users
are welcome to log their own personal Roster.


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn pretest --fix
yarn test
```

## Production deployment

A change on the production branch automatically triggers a deployment on
[https://status.dedis.ch](https://status.dedis.ch).

The production branch must only be used that way:

```bash
# Trigger a deployment:
git push origin master:production
