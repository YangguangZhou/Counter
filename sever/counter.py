from http.server import HTTPServer, BaseHTTPRequestHandler
import json
from urllib.parse import parse_qs, urlparse
import logging
import re
import time

# Set up logging
logging.basicConfig(filename='server.log', level=logging.DEBUG,
                    format='%(asctime)s - %(levelname)s - [%(pathname)s:%(lineno)d] - %(message)s')

class RequestHandler(BaseHTTPRequestHandler):

    def _set_headers(self, status_code=200, content_type='application/json'):
        self.send_response(status_code)
        self.send_header('Content-type', content_type)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

    def _get_name(self):
        if self.command == 'POST':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            return json.loads(post_data).get('name')
        elif self.command == 'GET':
            query_components = parse_qs(urlparse(self.path).query)
            return query_components.get('name', [None])[0]
        return None

    @staticmethod
    def _validate_name(name):
        pattern = re.compile(r'^[a-zA-Z0-9_\-\.!@#$%^&*()+=\[\]{}|;:,<>?]+$')
        return bool(pattern.match(name))

    @staticmethod
    def _read_counter_file():
        try:
            with open('/programs/counter/counter.json', 'r') as f:
                data = json.load(f)
                if not isinstance(data, list):
                    logging.error(f"Invalid data format in counter.json: {data}")
                    return []
                return data
        except (FileNotFoundError, json.JSONDecodeError) as e:
            logging.error(f"Error reading counter.json: {e}")
            return []

    @staticmethod
    def _write_counter_file(data):
        try:
            with open('/programs/counter/counter.json', 'w') as f:
                json.dump(data, f, indent=4)
        except Exception as e:
            logging.error(f"Error writing to counter.json: {e}")

    def _handle_counter(self):
        start_time = time.time()
        try:
            name = self._get_name()
            logging.info(f"Received counter request for name: {name}")
            
            if not name:
                logging.warning("Counter request received without name parameter")
                self._set_headers(400)
                self.wfile.write(json.dumps({"error": "Name parameter is required"}).encode())
                return

            if not self._validate_name(name):
                logging.warning(f"Invalid name format received: {name}")
                self._set_headers(400)
                self.wfile.write(json.dumps({
                    "error": "Invalid name format. Name must contain only English letters, numbers, and common special characters."
                }).encode())
                return

            counter_data = self._read_counter_file()
            
            for item in counter_data:
                if item.get('name') == name:
                    item['times'] += 1
                    break
            else:
                counter_data.append({"name": name, "times": 1})
            
            self._write_counter_file(counter_data)
            
            response = {"name": name, "times": next(item['times'] for item in counter_data if item.get('name') == name)}
            self._set_headers()
            self.wfile.write(json.dumps(response).encode())
            
            logging.info(f"Counter request for {name} completed successfully")
        except Exception as e:
            logging.error(f"Error in _handle_counter: {e}", exc_info=True)
            self._set_headers(500)
            self.wfile.write(json.dumps({"error": "Internal server error"}).encode())
        finally:
            logging.debug(f"Counter request processing time: {time.time() - start_time:.4f} seconds")

    def _handle_view(self):
        start_time = time.time()
        try:
            name = self._get_name()
            logging.info(f"Received view request for name: {name}")
            
            if not name:
                logging.warning("View request received without name parameter")
                self._set_headers(400)
                self.wfile.write(json.dumps({"error": "Name parameter is required"}).encode())
                return

            if not self._validate_name(name):
                logging.warning(f"Invalid name format received: {name}")
                self._set_headers(400)
                self.wfile.write(json.dumps({
                    "error": "Invalid name format. Name must contain only English letters, numbers, and common special characters."
                }).encode())
                return

            counter_data = self._read_counter_file()
            times = next((item['times'] for item in counter_data if item.get('name') == name), 0)
            
            response = {"name": name, "times": times}
            self._set_headers()
            self.wfile.write(json.dumps(response).encode())
            
            logging.info(f"View request for {name} completed successfully. Count: {times}")
        except Exception as e:
            logging.error(f"Error in _handle_view: {e}", exc_info=True)
            self._set_headers(500)
            self.wfile.write(json.dumps({"error": "Internal server error"}).encode())
        finally:
            logging.debug(f"View request processing time: {time.time() - start_time:.4f} seconds")

    def _handle_redirect(self):
        logging.info("Redirecting to the specified URL")
        self._set_headers(301, content_type='text/html')
        self.send_header('Location', 'https://blog.jerryz.com.cn/article/counter')
        self.end_headers()

    def do_POST(self):
        if self.path.startswith('/counter'):
            self._handle_counter()
        elif self.path.startswith('/view'):
            self._handle_view()
        else:
            logging.warning(f"Received POST request for unknown path: {self.path}")
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Not Found"}).encode())

    def do_GET(self):
        if self.path == '/':
            self._handle_redirect()
        elif self.path.startswith('/counter'):
            self._handle_counter()
        elif self.path.startswith('/view'):
            self._handle_view()
        else:
            logging.warning(f"Received GET request for unknown path: {self.path}")
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Not Found"}).encode())

def run_server(port=1145):
    server_address = ('', port)
    httpd = HTTPServer(server_address, RequestHandler)
    logging.info(f'Server started on port {port}')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        logging.info("Server stopped by user interruption")
    except Exception as e:
        logging.error(f"Unexpected error occurred: {e}", exc_info=True)
    finally:
        httpd.server_close()
        logging.info("Server shut down")

if __name__ == '__main__':
    run_server()