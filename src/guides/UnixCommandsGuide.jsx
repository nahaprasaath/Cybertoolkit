import ReferenceGuide from '../components/ReferenceGuide'

export default function UnixCommandsGuide() {
  return (
    <ReferenceGuide
      title="Unix/Linux Command Cheat Sheet"
      intro="The filters that make every forensics/log pipeline in this guide possible."
      sections={[
        {
          heading: 'Text filtering',
          code: `grep "pattern" file              # Search for a pattern
grep -i "pattern" file           # Case-insensitive
grep -r "pattern" dir/           # Recursive search through a directory
grep -v "pattern" file           # Invert match — lines that DON'T match
grep -c "pattern" file           # Count matching lines
grep -oE "regex" file            # Print only the matched substring

awk '{print $1}' file            # Print the first column
awk '{print $NF}' file           # Print the last column
awk -F: '{print $1}' file        # Use ':' as the field separator

cut -d: -f1,3 file               # Cut fields 1 and 3, ':' delimiter
sort file | uniq -c              # Count occurrences of each unique line
sort -n file                     # Numeric sort`,
        },
        {
          heading: 'Finding things',
          code: `find / -name "*.core" 2>/dev/null              # Find files by name
find / -perm -4000 2>/dev/null                 # Find SUID binaries (privesc hunting)
find /var -size +10M -ls                       # Find files bigger than 10MB

strings file                     # Extract printable strings from a binary
strings -n 8 file                # Only strings 8+ characters (cuts noise)
file suspicious_binary           # Identify file type
binwalk suspicious.bin           # Look for embedded/hidden files
binwalk -e suspicious.bin        # Extract embedded files`,
        },
        {
          heading: 'Network basics',
          code: `netstat -tulpn                   # Listening ports and owning processes
ss -tulpn                        # Modern replacement for netstat
lsof -i                          # All open network connections

nc -lvp 4444                     # Netcat: listen on a port
nc 10.10.10.10 4444              # Netcat: connect to a listener`,
        },
        {
          heading: 'Worked example: extracting flag-looking strings from an unknown binary',
          code: `file mystery_binary
strings -n 8 mystery_binary | grep -i "flag{"
binwalk mystery_binary        # In case the flag is in an embedded/hidden file instead`,
        },
      ]}
    />
  )
}
