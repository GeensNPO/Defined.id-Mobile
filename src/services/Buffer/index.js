class BufferService {
  static hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2) {
      bytes.push(parseInt(hex.substr(c, 2), 16));
    }
    return bytes;
  }

  static bytesToHex(bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) {
      var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
      hex.push((current >>> 4).toString(16));
      hex.push((current & 0xf).toString(16));
    }
    return hex.join('');
  }
}

export default BufferService;
