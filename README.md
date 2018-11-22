# @knaydenov/bem

Helper for BEM class generation

## Install

npm install @knaydenov/bem

## Usage

[![Build Status](https://travis-ci.org/knaydenov/bem.svg?branch=master)](https://travis-ci.org/knaydenov/bem)

```
import { b } from '@knaydenov/bem'

b('block').e('element');
// "block__element"

b('block').m('modifier', 'value');
// "block block--modifier_value"

b('block').m('modifier', 'value').e('element').m('hidden');
// "block__element block__element--hidden"

const block1 = b('block1');
const block2 = b('block2').m('show');
const element1 = b('block3').e('element1');

block1.setClasses(['no-js', 'super']);
block1.mix(block2).mix(element1)
// "block1 block2 block2--show block3__element1 no-js super"

```