import ReferenceGuide from '../components/ReferenceGuide'

export default function NetworkAnalysisGuide() {
  return (
    <ReferenceGuide
      title="Network Traffic Analysis"
      intro="Wireshark, tshark, tcpdump, and Scapy — reading and crafting packets."
      sections={[
        {
          heading: 'Wireshark (GUI) — display filters',
          paragraphs: [
            'Wireshark is the point-and-click tool; its display filter language is what you search with once a capture is open.',
          ],
          table: {
            headers: ['Filter', 'What it shows'],
            rows: [
              ['ip.addr == 10.0.0.5', 'Traffic to/from that IP (either direction)'],
              ['tcp.port == 80', 'Traffic on TCP port 80'],
              ['http.request.method == "POST"', 'HTTP POST requests'],
              ['http.request.uri contains "flag"', 'URIs containing "flag"'],
              ['dns', 'All DNS traffic'],
              ['tcp.flags.syn == 1 && tcp.flags.ack == 0', 'TCP SYN packets only (connection attempts)'],
              ['frame contains "password"', 'Any packet whose raw bytes contain that string'],
              ['tcp.stream eq 4', "Everything in one TCP conversation (stream #4)"],
              ['ftp or ftp-data', 'FTP control and data traffic'],
            ],
          },
        },
        {
          heading: 'Worked example',
          paragraphs: [
            "You're given a .pcap and told the flag was sent over HTTP:",
          ],
          list: [
            'Open the file, apply filter http.request.',
            'Right-click a suspicious request → Follow → HTTP Stream to read the full request/response as text.',
            "If the body is Base64, decode it with base64 -d or this site's Base64 tool.",
          ],
        },
        {
          heading: 'tshark (command-line Wireshark)',
          paragraphs: [
            "Same filtering engine as Wireshark, scriptable — useful when you can't open a GUI.",
          ],
          code: `tshark -r capture.pcap                          # Read and print a capture
tshark -r capture.pcap -Y "http.request"         # Apply a display filter (-Y)
tshark -r capture.pcap -f "port 80"              # Apply a capture filter (-f, BPF syntax)
tshark -i eth0                                   # Live capture on an interface
tshark -r capture.pcap -T fields -e ip.src -e ip.dst -e frame.time
                                                  # Extract specific fields (great for scripting)
tshark -r capture.pcap -z conv,tcp               # TCP conversation statistics

# Worked example: pull every DNS query out of a capture
tshark -r capture.pcap -Y "dns.flags.response == 0" -T fields -e dns.qry.name`,
        },
        {
          heading: 'tcpdump (lightweight CLI capture)',
          code: `tcpdump -i eth0                                  # Capture on an interface
tcpdump -i eth0 port 80                          # Only port 80
tcpdump -i eth0 host 10.0.0.5                    # Only traffic to/from a host
tcpdump -i eth0 -w capture.pcap                  # Write to a file
tcpdump -r capture.pcap                          # Read a saved capture
tcpdump -i eth0 -A port 80 | grep GET            # -A = ASCII payload; grep for HTTP GETs
tcpdump -i eth0 -X port 80                       # Payload in hex AND ASCII
tcpdump -nl -i eth0 not port ssh and src 192.168.1.10
                                                  # Exclude your own SSH, filter by source

# Worked example: capture only ICMP (ping) traffic and save it
tcpdump -i eth0 icmp -w pings.pcap`,
        },
        {
          heading: 'Scapy (Python packet crafting/analysis)',
          paragraphs: ['Used when you need to build, mangle, or replay packets rather than just read them.'],
          code: `from scapy.all import *

# Craft and send a packet, get the first reply
pkt = IP(dst="192.0.2.1")/TCP(dport=80)
reply = sr1(pkt)
reply.show()

# Sniff 50 packets off an interface
pkts = sniff(count=50, iface="eth0")

# Read a saved capture
pkts = rdpcap("capture.pcap")
pkts[0].show()
pkts[0][TCP].payload

# Worked example: extract every unique source IP from a pcap
from scapy.all import rdpcap, IP
pkts = rdpcap("capture.pcap")
print(set(p[IP].src for p in pkts if IP in p))`,
        },
      ]}
    />
  )
}
