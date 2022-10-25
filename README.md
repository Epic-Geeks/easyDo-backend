# Description

- What is the easyDo?

> easyDo is a platform that provide a place for vendors and providers to show their services, and for customers to buy these services.

# Prerequisites:

|  |  |  |
|---|---| --- |
| <img src="https://www.edureka.co/blog/wp-content/uploads/2019/07/express-logo.png" alt="drawing" style="width:80px;"/> | <img src="https://addons.mozilla.org/user-media/previews/full/227/227652.png?modified=1622133270" alt="drawing" style="width:80px;"/> | <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1985px-Postgresql_elephant.svg.png" alt="drawing" style="width:80px;"/> |
|<img src="https://www.vectorlogo.zone/logos/sequelizejs/sequelizejs-ar21.png" alt="drawing" style="width:80px;"/>| <img src="https://i.ytimg.com/vi/r1Iygf-rRdE/maxresdefault.jpg" alt="drawing" style="width:80px;"/> | <img src="https://cdn.base64decode.org/assets/images/b64-fb.png" alt="drawing" style="width:80px;"/>| 
| <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--ovG3I-9z--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/hryq136swg3qzhjsq309.png" alt="drawing" style="width:80px;"/> | <img src="https://i.ytimg.com/vi/nF9g1825mwk/maxresdefault.jpg" alt="drawing" style="width:80px;"/> | <img src="https://plugins.jetbrains.com/files/8320/140213/icon/pluginIcon.png" alt="drawing" style="width:80px;"/> |
| <img src="https://jestjs.io/img/opengraph.png" alt="drawing" style="width:80px;"/> | <img src="https://uploads-ssl.webflow.com/5d2dd7e1b4a76d8b803ac1aa/5ec378aeba225a04a9fbf23f_2CITJr58DL1gGqhLIYQ7K1IGxQiQCukvvb9JCRPgpuJEJUrBrzhuLhIN5Qfp-6SzmDta-BmPqr6-lV7PMfjhkpA17ho1c6CFAXKPkKSGcYhUNFNIugT-y0C2wL4h73J5bptonZ0W.png" alt="drawing" style="width:80px;"/> | <img src="https://miro.medium.com/max/1400/1*GZERaorN5x2x23N8x-rA3w.png" alt="drawing" style="width:80px;"/> |

# Technologies

- heruko.
- postgress.
- postman.
- git.
- github.
- nodejs.

# Contributing

- Mohammad Almomani.
- Malek Hamdan.
- Ali Mohammad.
- Shaima AlKhateeb.
- Amani Alsmadi.

# License

- MIT

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


# Schemas

> Admin
- username (String)
- email (String)
- password (String)
- visibility (Boolean)
- suspend (Boolean)
- role (ENUM (String))
- token (VIRTUAL)

> Chat

- ChatMessages (STRING[])
- providerID (INTEGER)
- customerID (INTEGER)

> Customer

- username (STRING)
- email (STRING)
- picture (STRING)
- customerAddress (STRING[])
- suspend (Boolean)
- password (STRING)

> Order

- orderNotes (STRING)
- visibility ()
- status (ENUM STRING[])
- customerID (INTEGER)
- providerID (INTEGER)
- serviceID (INTEGER)
- rateService (DOUBLE)
- orderDate (INTEGER)

> Provider

- username (STRING)
- email (STRING)
- picture (STRING[])
- providerCoveredCities
- availableTimes (STRING[])
- suspend (Boolean)
- visibility (Boolean)
- password (STRING)
- token (VIRTUAL)
- role (ENUM STRING)

> Service

- serviceDescription (STRING)
- price (DOUBLE)
- picture (STRING [])
- serviceCategory (ENUM STRING)
- visibility (BOOLEAN)
- averageRate (DOUBLE)
- providerID (INTEGER)


# Version Control

The Main branch will be protected and untouched, the work will be done on a test branch, all branches must be created from test and all pushes must go to test, Mohammad Almomani and Malek Hamdan will review the code, any question arises during review will be directed to the commit owner, all merges must be approved.

## Functional Requirement 

- A customer should be able to check the order status on the dashboard.

## Non-Functional Requirement 

- The website must support 5000 users, at the same time.
