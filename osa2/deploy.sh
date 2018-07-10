#!/bin/sh
npm run build
rm -rf ../../FullStack-harjoitukset/FullStack2018/osa3/build
cp -r build ../..//home/svsv/FullStack-harjoitukset/FullStack2018/osa3/
