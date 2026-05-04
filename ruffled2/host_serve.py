#!/usr/bin/env python3
"""Run on the host. Serves the Mood Indigo site (this directory) at http://localhost:8000."""
import http.server
import os
import socketserver

PORT = 8080

class Handler(http.server.SimpleHTTPRequestHandler):
    pass

Handler.extensions_map.update({
    ".wasm": "application/wasm",
    ".js": "application/javascript",
    ".swf": "application/x-shockwave-flash",
})

os.chdir(os.path.dirname(os.path.abspath(__file__)))
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving Mood Indigo at http://localhost:{PORT}/")
    httpd.serve_forever()
