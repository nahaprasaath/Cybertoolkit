import ReferenceGuide from '../components/ReferenceGuide'

export default function LogAnalysisGuide() {
  return (
    <ReferenceGuide
      title="Log & Artifact Analysis"
      intro="grep/strings/sort pipelines — less about one tool, more about a repeatable workflow."
      sections={[
        {
          heading: 'Pattern 1 — Base64 blob hidden in an EVTX/Sysmon log (à la "Hidden Streams", Huntress CTF)',
          code: `evtx_dump Sysmon.evtx | grep "EventID: 15"      # Event ID 15 = FileCreateStreamHash (alt data stream)
echo "ZmxhZ3tiZmVmYjg5MTE4MzAzMmY0NGZhOTNkMGM3YmQ0MGRhOX0=" | base64 -d
# -> flag{bfefb891183032f44fa93d0c7bd40da9}`,
        },
        {
          heading: 'Pattern 2 — anomalous domain in a big HTTP log (à la "Log Analysis", WolvCTF)',
          code: `wc -l logs.txt                                   # How big is this thing
strings logs.txt | grep "suspiciousdomain"       # Pull matching lines
strings logs.txt | grep "suspiciousdomain" | sort -u    # Deduplicate
grep -v "\\.io" domain_list.txt                   # Invert-match to rule out known-good domains`,
        },
        {
          heading: 'Useful grep flags',
          list: [
            '-i : ignore case',
            '-r : recursive search through a directory',
            '-n : show line numbers',
            '-v : invert match (show lines that do NOT match)',
            '-E : extended regex',
            '-o : print only the matched substring — combine with a regex to extract IPs: grep -oE "([0-9]{1,3}\\.){3}[0-9]{1,3}" file',
          ],
        },
      ]}
    />
  )
}
