## Cooperative Recovery Initiative Story Map

This interactive story map highlights projects funded by the Cooperative Recovery Initiative (CRI), which is an internal grant program.  The program is administered by the National Wildlife Refuge system out of the Headquarters office.

## Requirements

- [NodeJS](https://nodejs.org/en/) version 4.2.x (Roy is currently on 4.2.4)
- [Git](https://git-scm.com/downloads) (Roy is currently using 2.6.4 [Apple Git-63])
- [Sharp/libvips](http://sharp.dimens.io/en/stable/install/#installation)

### Mac OSX
`libvips` is a utility required by [Sharp](http://sharp.dimens.io/en/).  On a mac with [homebrew](http://brew.sh/) installed run `brew install homebrew/science/vips` in your terminal.

### Windows
`libvips` is included with the installation of [Sharp](http://sharp.dimens.io/en/) on Windows.  I ran into issues installing Sharp due to errors from [node-gyp](https://github.com/nodejs/node-gyp).  Installing [Visual Studio Community](https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx) **with C++ tools, which are not installed by default** solved the issue.  

![Visual Studio Community Installer](https://cloud.githubusercontent.com/assets/94334/9250024/a3ca627a-41d2-11e5-8efb-1417d686eaa4.png)

For more information check out the tread on [GitHub](https://github.com/nodejs/node-gyp/issues/629#issuecomment-153196245).

**Keep in mind this site was developed using a Mac.  There are often *gotchas* associated with Windows machines that I have not run into.**

## Install dependencies

To ease development we use npm scripts to compile JS with browserify/watchify, compile sass to css, optimize images, etc:

First, install the project dependencies:

`npm install`

## Development

To kick off the development server and all pre-requisite tasks:

`npm start`

To build a production ready version of the app use:

`npm run build`

To publish a production ready demo to GitHub Pages:

`npm run publish:demo`

To visualize packages contributing to bundle file size:

`npm run inspect`

### License

This project is in the Public Domain.

The United States Fish and Wildlife Service (FWS) GitHub project code is provided on an "as is" basis and the user assumes responsibility for its use. FWS has relinquished control
of the information and no longer has responsibility to protect the integrity, confidentiality, or availability of the information. Any reference to specific commercial products, processes, or services by service mark, trademark, manufacturer, or otherwise, does not constitute or imply their endorsement, recommendation or favoring by FWS. The FWS seal and logo shall not be used in any manner to imply endorsement of any commercial product or activity by FWS or the United States Government.
