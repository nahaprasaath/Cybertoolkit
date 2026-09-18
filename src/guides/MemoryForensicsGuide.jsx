import ReferenceGuide from '../components/ReferenceGuide'

export default function MemoryForensicsGuide() {
  return (
    <ReferenceGuide
      title="Memory Forensics — Volatility 3"
      intro="Analyzing RAM dumps: processes, injected code, network artifacts, credentials, and persistence."
      sections={[
        {
          heading: 'Install',
          code: `python3 -m venv venv && source venv/bin/activate
pip install volatility3
vol -f mem.raw windows.info          # Confirm the profile/OS Volatility detected`,
        },
        {
          heading: 'Core commands by task',
          table: {
            headers: ['Goal', 'Command'],
            rows: [
              ['List processes', 'vol -f mem.raw windows.pslist'],
              ['Process tree', 'vol -f mem.raw windows.pstree'],
              ["See a process's command line", 'vol -f mem.raw windows.cmdline --pid <PID>'],
              ['Find injected code', 'vol -f mem.raw windows.malfind'],
              ['Dump a process/file from memory', 'vol -f mem.raw windows.dumpfiles --pid <PID>'],
              ['List network connections', 'vol -f mem.raw windows.netscan'],
              ['List registry hives', 'vol -f mem.raw windows.registry.hivelist'],
              ['Dump password hashes', 'vol -f mem.raw windows.hashdump'],
              ['Read a specific registry key', "vol -f mem.raw windows.registry.getkey -k 'HKLM\\Software\\...\\Run'"],
              ['Find dropped/carved files', 'vol -f mem.raw windows.filescan'],
              ['List loaded kernel modules', 'vol -f mem.raw windows.modules'],
            ],
          },
        },
        {
          heading: 'Worked example: find the malicious process',
          code: `vol -f mem.raw windows.pstree                 # Spot an odd-looking process/parent
vol -f mem.raw windows.cmdline --pid 3124     # Its command line often has the flag or a clue
vol -f mem.raw windows.malfind                # Confirm injected/suspicious memory regions
vol -f mem.raw windows.dumpfiles --pid 3124   # Dump it and grep the result
strings dump.bin | grep 'FLAG{'`,
        },
        {
          heading: 'Practice datasets',
          list: [
            'MemLabs — github.com/stuxnet999/MemLabs',
            'Volatility Samples wiki (official)',
            'DFIR Madness — "The Stolen Szechuan Sauce" case',
          ],
        },
      ]}
    />
  )
}
