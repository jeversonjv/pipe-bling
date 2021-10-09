import { Json2Xml as Json2XmlInterface } from './protocols/json-2-xml'
import json2xml from 'json2xml'

export class Json2XmlHelper implements Json2XmlInterface {
  transform (json: object): string {
    return json2xml(json, {
      heades: true
    })
  }
}
