# cutr

Unix cut tool like but with regular expression cutter delimiter

## Usage:

```bash
$ cutr -h
  Usage: index [options] [command]
  
  Commands:
    help     Display help
    version  Display version
  
  Options:
    -d, --d [value]  delimiter regex (does not show non-matches) (defaults to " ")
    -f, --f          field ($start-$end) (defaults to "2-")
    -h, --help       Output usage information
    -r, --r [value]  replacement for delimiter (defaults to " ")
    -v, --version    Output the version number
```

## Examples

```bash
$ ls --full-time | sort | uniq | cutr -d ' +' -f 6-
2020-01-18 22:10:15.521444779 +1300 node_modules
2020-01-18 17:18:08.315037100 +1300 test
2020-01-18 22:08:55.736838633 +1300 lib.ts
2020-01-18 22:10:21.577489391 +1300 lib.js
2020-01-18 15:12:35.081558486 +1300 cutr-1.0.0.tgz
2020-01-18 22:10:15.525444808 +1300 yarn.lock
2020-01-18 21:41:56.759715570 +1300 package-lock.json
2020-01-18 22:16:05.615776099 +1300 README.md
2020-01-18 13:57:29.138166093 +1300 tsconfig.json
2020-01-18 22:09:20.237028558 +1300 index.ts
2020-01-18 22:16:44.832012722 +1300 package.json
2020-01-18 22:10:21.585489449 +1300 index.js```
