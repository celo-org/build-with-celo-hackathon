# My Deed

My Deed by Primus Money is a progressive wallet app allowing you to easily create a deed that you can trade as an NFT.

"One hour of language lesson at a specific hour of the week for 3 months", "A day in the month for a year to help doing domestic chores", there are several small services that would benefit from having a sort of written contract to make things clearer. Using a blockchain makes it now very easy to materialize. It offers the additional benefit of making compensation for those services, and potentially resell of these, efficient to organize and it opens up an whole new world of possibilities to extend the reach of these transactions.

## Table of Contents

- [SystemRequirements](#SystemRequirements
- [Installation](#install)
- [Development](#development)
- [Build](#build)


## SystemRequirements
To build for release or run My Deed in development mode, you need to have nodejs installed on your machine (v14.16.x recommended)
## Install

Run within the root directory containing package.json

```
npm install
```



## Development

Run within the ./shell-scripts directory

```
./run_dev.sh
```

You can then access the progressive wallet app with http://localhost:3000/my-deed
## Build

Run within the ./shell-scripts directory

```
./build_release.sh
```

You can then copy the files in the ./build directory to a sub-directory named /my-deed on your public web site.