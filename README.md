# auth-server

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## About <a name = "about"></a>

I found a distinct lack of self-contained, simple auth projects that fit my needs, so I decided to make an example myself.

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

You will need node and git working

### Installing

Install with

```
npm i
```

And then run with the command

```
npm start
```


## Usage <a name = "usage"></a>

The routes used are /api/users/signin to sign in, POST to /api/users to create a user, and a GET to /api/users/current to get current user data.