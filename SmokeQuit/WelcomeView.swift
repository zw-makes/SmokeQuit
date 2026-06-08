import SwiftUI

struct WelcomeView: View {
    @State private var animateLungs = false
    @State private var showContent = false
    
    var body: some View {
        ZStack {
            // Premium background gradient representing pure air and recovery
            LinearGradient(
                colors: [
                    Color(red: 0.05, green: 0.08, blue: 0.16), // Dark Slate
                    Color(red: 0.02, green: 0.12, blue: 0.09)  // Deep Emerald
                ],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            .ignoresSafeArea()
            
            // Decorative background glowing spots
            VStack {
                Circle()
                    .fill(Color.emeraldColor.opacity(0.15))
                    .frame(width: 300, height: 300)
                    .blur(radius: 80)
                    .offset(x: -100, y: -100)
                Spacer()
                Circle()
                    .fill(Color.mintColor.opacity(0.12))
                    .frame(width: 250, height: 250)
                    .blur(radius: 70)
                    .offset(x: 120, y: 100)
            }
            .ignoresSafeArea()
            
            VStack(spacing: 24) {
                Spacer()
                
                // Brand Header with Icon
                VStack(spacing: 16) {
                    // Glowing Clean Lungs icon structure
                    ZStack {
                        // Outer glowing rings
                        Circle()
                            .stroke(Color.emeraldColor.opacity(0.2), lineWidth: 2)
                            .frame(width: 130, height: 130)
                            .scaleEffect(animateLungs ? 1.15 : 0.95)
                            .opacity(animateLungs ? 0.2 : 0.8)
                        
                        Circle()
                            .stroke(Color.emeraldColor.opacity(0.3), lineWidth: 1)
                            .frame(width: 110, height: 110)
                            .scaleEffect(animateLungs ? 1.08 : 0.98)
                        
                        // Glassmorphic circle container
                        Circle()
                            .fill(Color.white.opacity(0.06))
                            .frame(width: 90, height: 90)
                            .overlay(
                                Circle()
                                    .stroke(
                                        LinearGradient(
                                            colors: [.white.opacity(0.4), .clear],
                                            startPoint: .topLeading,
                                            endPoint: .bottomTrailing
                                        ),
                                        lineWidth: 1
                                    )
                            )
                            .shadow(color: Color.emeraldColor.opacity(0.3), radius: 15, x: 0, y: 8)
                        
                        // SF Symbol for clean lungs / respiration
                        Image(systemName: "lungs.fill")
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 44, height: 44)
                            .foregroundColor(.emeraldColor)
                            .shadow(color: .emeraldColor, radius: 10)
                            .scaleEffect(animateLungs ? 1.05 : 0.95)
                    }
                    .onAppear {
                        withAnimation(.easeInOut(duration: 2.2).repeatForever(autoreverses: true)) {
                            animateLungs = true
                        }
                    }
                    
                    VStack(spacing: 4) {
                        Text("Breathe")
                            .font(.system(size: 44, weight: .black, design: .rounded))
                            .foregroundColor(.white)
                            .tracking(1)
                        
                        Text("QUIT SMOKING TOGETHER")
                            .font(.system(size: 11, weight: .bold))
                            .foregroundColor(.emeraldColor)
                            .tracking(3)
                    }
                }
                .opacity(showContent ? 1.0 : 0.0)
                .offset(y: showContent ? 0 : 20)
                
                Spacer()
                
                // Feature Cards
                VStack(spacing: 16) {
                    FeatureRow(
                        icon: "heart.text.square.fill",
                        title: "Track Recovery",
                        description: "Watch your lungs restore, your blood pressure drop, and your oxygen levels return to normal in real-time."
                    )
                    
                    FeatureRow(
                        icon: "dollarsign.circle.fill",
                        title: "Save Money",
                        description: "See the exact amount of money you save each day and track what reward you can buy next."
                    )
                    
                    FeatureRow(
                        icon: "person.2.fill",
                        title: "Quit with Friends",
                        description: "Form a support group with your friends, share your smoke-free days, and keep each other motivated."
                    )
                }
                .padding(.horizontal, 24)
                .opacity(showContent ? 1.0 : 0.0)
                .offset(y: showContent ? 0 : 30)
                
                Spacer()
                
                // Call to Action
                VStack(spacing: 16) {
                    Button(action: {
                        // Action for onboarding completion
                        print("Get Started Tapped")
                    }) {
                        Text("Start Your Journey")
                            .font(.system(size: 17, weight: .bold, design: .rounded))
                            .foregroundColor(.black)
                            .frame(maxWidth: .infinity)
                            .frame(height: 56)
                            .background(
                                LinearGradient(
                                    colors: [Color.emeraldColor, Color.mintColor],
                                    startPoint: .leading,
                                    endPoint: .trailing
                                )
                            )
                            .cornerRadius(28)
                            .shadow(color: Color.emeraldColor.opacity(0.4), radius: 12, x: 0, y: 6)
                    }
                    .padding(.horizontal, 24)
                    
                    Text("Join thousands who have reclaimed their lungs.")
                        .font(.system(size: 12))
                        .foregroundColor(.gray)
                }
                .opacity(showContent ? 1.0 : 0.0)
                .offset(y: showContent ? 0 : 40)
                
                Spacer()
            }
        }
        .onAppear {
            withAnimation(.easeOut(duration: 0.8)) {
                showContent = true
            }
        }
    }
}

// Subview for Feature List Rows
struct FeatureRow: View {
    let icon: String
    let title: String
    let description: String
    
    var body: some View {
        HStack(alignment: .top, spacing: 16) {
            ZStack {
                RoundedRectangle(cornerRadius: 12)
                    .fill(Color.white.opacity(0.05))
                    .frame(width: 48, height: 48)
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(Color.white.opacity(0.1), lineWidth: 1)
                    )
                
                Image(systemName: icon)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 24, height: 24)
                    .foregroundColor(.emeraldColor)
            }
            
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.system(size: 16, weight: .semibold, design: .rounded))
                    .foregroundColor(.white)
                
                Text(description)
                    .font(.system(size: 13))
                    .foregroundColor(.gray)
                    .fixedSize(horizontal: false, vertical: true)
                    .lineSpacing(2)
            }
            
            Spacer()
        }
        .padding(16)
        .background(Color.white.opacity(0.02))
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(Color.white.opacity(0.04), lineWidth: 1)
        )
    }
}

// Custom Colors helper - naming emeraldColor and mintColor to avoid conflicts with native SwiftUI mint
extension Color {
    static let emeraldColor = Color(red: 0.06, green: 0.80, blue: 0.48)
    static let mintColor = Color(red: 0.20, green: 0.85, blue: 0.70)
}

struct WelcomeView_Previews: PreviewProvider {
    static var previews: some View {
        WelcomeView()
            .preferredColorScheme(.dark)
    }
}
