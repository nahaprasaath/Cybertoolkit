import ReferenceGuide from '../components/ReferenceGuide'

export default function ScanningReconGuide() {
  return (
    <ReferenceGuide
      title="Scanning & Recon"
      intro="Nmap, common ports, and an IPv6 quick reference."
      sections={[
        {
          heading: 'Nmap',
          code: `nmap 192.168.1.1                       # Default scan, top 1000 TCP ports
nmap -p- 192.168.1.1                   # All 65535 ports
nmap -p 22,80,443 192.168.1.1          # Specific ports
nmap -sV 192.168.1.1                   # Service/version detection
nmap -sS 192.168.1.1                   # Stealth SYN scan (needs root)
nmap -O 192.168.1.1                    # OS detection
nmap -A 192.168.1.1                    # OS + version + scripts + traceroute (noisy)
nmap -sU -p 53,161 192.168.1.1         # UDP scan on specific ports
nmap -sn 192.168.1.0/24                # Host discovery only, no port scan
nmap -oA results 192.168.1.1           # Save output in all formats`,
        },
        {
          heading: 'Nmap Scripting Engine (NSE)',
          paragraphs: ['A huge force-multiplier in CTFs.'],
          code: `nmap -sC 192.168.1.1                                   # Run default safe scripts
nmap --script vuln 192.168.1.1                         # Vulnerability-scan script category
nmap --script http-robots.txt 192.168.1.1              # Pull robots.txt from any web server found
nmap --script smb-brute.nse -p445 192.168.1.1          # Try common SMB creds
nmap --script dns-zone-transfer.nse \\
  --script-args dns-zone-transfer.domain=example.com -p53 ns.example.com

# Worked example: a typical full recon pass on one box
nmap -sV -sC -p- -oA fullscan 10.10.10.10`,
        },
        {
          heading: 'Common Ports (quick lookup)',
          table: {
            headers: ['Port', 'Service', 'Port', 'Service'],
            rows: [
              ['21', 'FTP', '143', 'IMAP4'],
              ['22', 'SSH/SCP', '161-162', 'SNMP'],
              ['23', 'Telnet', '389', 'LDAP'],
              ['25', 'SMTP', '443', 'HTTPS'],
              ['53', 'DNS', '445', 'SMB (Microsoft-DS)'],
              ['67-68', 'DHCP', '993', 'IMAP4 over SSL'],
              ['80', 'HTTP', '995', 'POP3 over SSL'],
              ['88', 'Kerberos', '1433-1434', 'Microsoft SQL'],
              ['110', 'POP3', '2049', 'NFS'],
              ['111', 'RPCbind', '3306', 'MySQL'],
              ['119', 'NNTP', '3389', 'RDP'],
              ['123', 'NTP', '5432', 'PostgreSQL'],
              ['135', 'Microsoft RPC', '5900+', 'VNC'],
              ['137-139', 'NetBIOS', '6379', 'Redis'],
            ],
          },
        },
        {
          heading: 'IPv6 Quick Reference',
          list: [
            'Address is 128 bits, written in 8 groups of 4 hex digits; leading zeros per group can be dropped, and one run of consecutive all-zero groups can be collapsed to ::.',
            'Link-local: FE80::/10 — used automatically on every interface.',
            'Unique local (like private IPv4): FC00::/7.',
            'Loopback: ::1/128.',
            'Multicast: FF00::/8.',
            'ping6 / ping -6 and nmap -6 work the same way as their IPv4 counterparts.',
          ],
        },
      ]}
    />
  )
}
