import { Locator, Page } from '@playwright/test'
import { Component } from './Component'


export class Badge extends Component {
  constructor(page: Page, locator: Locator) {
    super(page, locator)
  }
}
