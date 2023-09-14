/* Copyright 2023 Google LLC.
SPDX-License-Identifier: Apache-2.0 */

const svgContainer = document.getElementById('svg-container');

fetch('../data/svg.html').then(function(response) {
  return response.text();
}).then(function(html) {
  svgContainer.innerHTML = html;
});
