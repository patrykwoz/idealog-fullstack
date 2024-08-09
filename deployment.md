# IdeaLog API Project - Development

Here are a few important notes regarding the deployment of IdeaLog to Heroku.

## General Strategy

The backend is deployed alongside the Celery worker as a single application, while the frontend is deployed separately. The frontend makes HTTP CORS requests to communicate with the backend.

## Preflight Redirects

A common issue during deployment is related to paths that end with a trailing slash (`/`). This can cause HTTP requests to be redirected, which in turn may lead to HTTP CORS requests being automatically rejected upon redirection. This issue is described in more detail in the following GitHub discussion:

[Trailing Slash GitHub Issue](https://github.com/fastapi/fastapi/issues/731)

I highly recommend reading more about preflighted requests and redirects to better understand how they interact with CORS policies. You can find detailed information here:

[MDN Web Docs: HTTP CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
