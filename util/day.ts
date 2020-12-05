import { argv } from 'process';
import path from 'path'

export default parseInt(path.parse(argv[1]).dir.split(path.sep).pop()!, 10)
