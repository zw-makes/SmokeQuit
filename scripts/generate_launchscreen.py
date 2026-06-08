#!/usr/bin/env python3
import subprocess
import plistlib
import os
import io

# --- Get exact toolsVersion from ibtool --version plist output ---
tools_ver = "23088"
plugin_ver = "23070"

try:
    result = subprocess.run(
        ["xcrun", "ibtool", "--version", "--output-format", "xml1"],
        capture_output=True
    )
    plist_data = plistlib.loads(result.stdout)
    version_dict = plist_data.get("com.apple.ibtool.version", {})
    tools_ver = str(version_dict.get("com.apple.ibtool.document.toolsVersion", tools_ver))
    print(f"ibtool toolsVersion: {tools_ver}")
    print(f"ibtool version: {version_dict.get('com.apple.ibtool.version', 'unknown')}")
except Exception as e:
    print(f"Could not parse ibtool version plist: {e}, using default {tools_ver}")

# --- Get IBCocoaTouchPlugin version ---
try:
    xcode_path = subprocess.run(
        ["xcode-select", "-p"],
        capture_output=True, text=True
    ).stdout.strip()
    xcode_app = xcode_path.replace("/Contents/Developer", "")

    # Try both possible plugin locations
    possible_paths = [
        os.path.join(xcode_app, "Contents/Developer/Library/Xib Compilers/IBCocoaTouchPlugin.ibplugin/Contents/Info.plist"),
        os.path.join(xcode_app, "Contents/PlugIns/IBCocoaTouchPlugin.ibplugin/Contents/Info.plist"),
        "/Applications/Xcode.app/Contents/Developer/Library/Xib Compilers/IBCocoaTouchPlugin.ibplugin/Contents/Info.plist",
    ]
    for plugin_path in possible_paths:
        if os.path.exists(plugin_path):
            with open(plugin_path, "rb") as f:
                pdata = plistlib.load(f)
            plugin_ver = str(pdata.get("CFBundleVersion", plugin_ver))
            print(f"Plugin version: {plugin_ver} (from {plugin_path})")
            break
    else:
        print(f"Plugin plist not found in any location, using default: {plugin_ver}")
except Exception as e:
    print(f"Could not get plugin version: {e}, using default: {plugin_ver}")

print(f"Generating LaunchScreen.storyboard with toolsVersion={tools_ver}, pluginVersion={plugin_ver}")

# NOTE: targetRuntime is intentionally omitted — it is not valid in Xcode 16+ for iOS storyboards
storyboard = f"""<?xml version="1.0" encoding="UTF-8"?>
<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="{tools_ver}" propertyAccessControl="none" useAutolayout="YES" launchScreen="YES" useTraitCollections="YES" useSafeAreas="YES" colorMatched="YES" initialViewController="01J-lp-oVM">
    <device id="retina6_12" orientation="portrait" appearance="light"/>
    <dependencies>
        <deployment identifier="iOS"/>
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="{plugin_ver}"/>
        <capability name="Safe area layout guides" minToolsVersion="9.0"/>
        <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>
    </dependencies>
    <scenes>
        <scene sceneID="EHf-IW-A2E">
            <objects>
                <viewController id="01J-lp-oVM" sceneMemberID="viewController">
                    <view key="view" contentMode="scaleToFill" id="Ze5-6b-2t3">
                        <rect key="frame" x="0.0" y="0.0" width="393" height="852"/>
                        <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
                        <color key="backgroundColor" red="0.051" green="0.082" blue="0.161" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
                    </view>
                </viewController>
                <placeholder placeholderIdentifier="IBFirstResponder" id="iYj-Kq-Ea1" userLabel="First Responder" sceneMemberID="firstResponder"/>
            </objects>
            <point key="canvasLocation" x="53" y="375"/>
        </scene>
    </scenes>
</document>
"""

output_path = os.path.join("SmokeQuit", "LaunchScreen.storyboard")
with open(output_path, "w", encoding="utf-8") as f:
    f.write(storyboard)

print(f"Written: {output_path}")
print("Done!")
