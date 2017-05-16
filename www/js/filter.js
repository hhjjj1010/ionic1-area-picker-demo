/**
 * Created by Hock on 16/10/13.
 */
angular.module('starter.filter', [])

.filter ('substring',function () {

  return function (str) {
    if (str.length >= 40) {
      return str.substr(0, 40) + "...";
    }

    return str;
  }
})
