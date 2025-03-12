# GIT Config
git config --global color.ui true
git lfs install
git config --global trailer.changeid.key "Change-Id"
git config --global pull.rebase true

mkdir lineage-20.0
cd lineage-20.0
repo init -u https://github.com/LineageOS/android.git -b lineage-20.0 --git-lfs
repo sync build/make
wget -O - https://raw.githubusercontent.com/waydroid/android_vendor_waydroid/lineage-20/manifest_scripts/generate-manifest.sh | bash
git clone https://github.com/android-generic/vendor_ag vendor/ag
nvim .repo/manifests/default.xml
repo sync
nvim device/waydroid/waydroid/device.mk
nvim device/waydroid/waydroid/BoardConfig.mk

# Android Platform Tools PATH
echo 'export PATH="$HOME/Android/Sdk/platform-tools:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Force sync and build
vendor/extra/manifest_scripts/generate-manifest.sh
repo sync --force-sync
. build/envsetup.sh
apply-waydroid-patches
lunch lineage_waydroid_x86_64-userdebug
make systemimage -j$(nproc --all)
make vendorimage -j$(nproc --all)

# Firewalld
firewall-cmd --permanent --zone=internal --add-interface=waydroid0
firewall-cmd --permanent --zone=external --add-interface=wlan0
firewall-cmd --permanent --zone=drop --set-target=DROP
# firewall-cmd --permanent --zone=internal --set-target=ACCEPT
# firewall-cmd --permanent --zone=external --add-masquerade
firewall-cmd --permanent --zone=internal --add-rich-rule='rule family="ipv4" source address="172.16.0.1/24" accept'
firewall-cmd --permanent --zone=external --add-rich-rule='rule family="ipv4" destination address="192.168.24.1/24" accept'
firewall-cmd --reload

# Systemd Service
sudo systemctl start waydroid-container.service

# Wayland session
waydroid session start

# Route
echo "ip route add default via 192.168.24.1" | sudo waydroid shell

# arm64 translation
sudo waydroid-extras -n

# Start ui
waydroid show-full-ui

# Shared folders
sudo umount ~/.local/share/waydroid/data/media/0/Documents
sudo umount ~/.local/share/waydroid/data/media/0/Download
sudo umount ~/.local/share/waydroid/data/media/0/Music
sudo umount ~/.local/share/waydroid/data/media/0/Pictures
sudo umount ~/.local/share/waydroid/data/media/0/Movies
sudo mount --bind ~/Documents ~/.local/share/waydroid/data/media/0/Documents
sudo mount --bind ~/Downloads ~/.local/share/waydroid/data/media/0/Download
sudo mount --bind ~/Music ~/.local/share/waydroid/data/media/0/Music
sudo mount --bind ~/Pictures ~/.local/share/waydroid/data/media/0/Pictures
sudo mount --bind ~/Videos ~/.local/share/waydroid/data/media/0/Movies

# Miscellaneous
waydroid prop set persist.waydroid.multi_windows true
waydroid prop set persist.waydroid.fake_touch $package-name
waydroid prop set persist.waydroid.fake_wifi $package-name

# Google Play Certification
# https://www.google.com/android/uncertified
sudo waydroid shell
ANDROID_RUNTIME_ROOT=/apex/com.android.runtime ANDROID_DATA=/data ANDROID_TZDATA_ROOT=/apex/com.android.tzdata ANDROID_I18N_ROOT=/apex/com.android.i18n sqlite3 /data/data/com.google.android.gsf/databases/gservices.db "select * from main where name = \"android_id\";"

# Root Premission
sudo waydroid shell
sh /storage/emulated/0/Android/data/moe.shizuku.privileged.api/start.sh

# ADB
adb connect <IP>:5555

# Clean up and recompile
sudo systemctl stop waydroid-container.service
sudo rm -rf /var/lib/waydroid/ /home/.waydroid/ ~/waydroid/ ~/.share/waydroid/ ~/.local/share/applications/*aydroid*/ ~/.local/share/waydroid/
#重新编译复制waydroid镜像，这一步必不可少
sudo waydroid init -f -i /usr/share/waydroid-extra/images