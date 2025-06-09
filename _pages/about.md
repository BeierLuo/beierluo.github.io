---
permalink: /
title: "About Me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I am a first year graduate student from Southern University of Science and Technology (SUSTech), under the supervision of [Prof. Hongxin Wei](https://hongxin001.github.io/). I also received my Bachelor’s degree in Statistics from SUSTech.

Research Interests
======
- Reliable Machine Learning: confidence calibration, conformal prediction
- Large Language Models: speculative decoding, test-time adaptation

Working Papers
======

Selected Publications
======
{% for post in site.publications reversed %}
<div style="margin-bottom: 1.5em;">
  <p style="margin: 0;">
    <a href="{{ post.pdf | prepend: site.baseurl }}" target="_blank" rel="noopener noreferrer">{{ post.title }}</a>
  </p>
  <p style="margin: 0.1em 0;">{{ post.authors }}</p>
  <p style="margin: 0.1em 0;">
    <i>{{ post.venue }}</i>, {{ post.year }}
    &nbsp;&nbsp; <a href="{{ post.pdf | prepend: site.baseurl }}" target="_blank" rel="noopener noreferrer" style="border: 1px solid; padding: 2px 6px; border-radius: 4px; text-decoration: none;">PDF</a>
  </p>
</div>
{% endfor %}


