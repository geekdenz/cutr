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
